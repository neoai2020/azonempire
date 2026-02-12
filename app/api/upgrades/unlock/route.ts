import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin Client lazily to prevent module-level errors
const getSupabaseAdmin = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        throw new Error('Supabase environment variables are missing');
    }

    return createClient(url, key, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};

const SECRET_SLUGS: Record<string, string> = {
    '10x-upgrade-unlock-8f72kd9': 'upgrade_10x',
    'dfy-secret-access-29s81h': 'upgrade_dfy',
    'traffic-booster-vip-94j2l1': 'upgrade_traffic',
    'conversion-master-key-77v3p9': 'upgrade_conversion',
};

export async function POST(request: Request) {
    // 1. Check Configuration
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceKey || !supabaseUrl) {
        const missing = !serviceKey ? 'SUPABASE_SERVICE_ROLE_KEY' : 'NEXT_PUBLIC_SUPABASE_URL';
        console.error(`CRITICAL: Missing ${missing} in Environment Variables`);
        return NextResponse.json({
            error: `Configuration Missing: ${missing} is not set or empty in the server environment.`
        }, { status: 500 });
    }

    try {
        const body = await request.json().catch(() => null);

        if (!body) {
            return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
        }

        const { email, secretSlug } = body;

        if (!email || !secretSlug) {
            return NextResponse.json({ error: 'Missing email or secret code' }, { status: 400 });
        }

        const upgradeKey = SECRET_SLUGS[secretSlug];
        if (!upgradeKey) {
            return NextResponse.json({ error: 'Invalid secret access code' }, { status: 404 });
        }

        let adminClient;
        try {
            adminClient = getSupabaseAdmin();
        } catch (err: any) {
            console.error('Initialisation Error:', err);
            return NextResponse.json({ error: 'System configuration error' }, { status: 500 });
        }

        // 1. Find User by Email
        // Note: listUsers is the standard way with Admin Auth API. 
        // We'll limit the search if possible, or just be careful.
        const { data: { users }, error: userError } = await adminClient.auth.admin.listUsers();

        if (userError || !users) {
            console.error('Admin API Error:', userError);
            return NextResponse.json({ error: 'System error: Cannot access user database' }, { status: 500 });
        }

        const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase());

        if (!user) {
            return NextResponse.json({ error: 'No account found with this email. Please check your spelling.' }, { status: 404 });
        }

        // 2. Update User Metadata
        const currentUpgrades = (user.user_metadata?.unlocked_upgrades as string[]) || [];

        if (!currentUpgrades.includes(upgradeKey)) {
            const newUpgrades = [...currentUpgrades, upgradeKey];

            const { error: updateError } = await adminClient.auth.admin.updateUserById(
                user.id,
                { user_metadata: { ...user.user_metadata, unlocked_upgrades: newUpgrades } }
            );

            if (updateError) {
                console.error('Update Error:', updateError);
                return NextResponse.json({ error: 'Failed to unlock upgrade. Database update failed.' }, { status: 500 });
            }
        }

        return NextResponse.json({ success: true, message: 'Upgrade unlocked successfully' });

    } catch (e: any) {
        console.error('Unlock API Global Error:', e);
        // Ensure we ALWAYS return JSON
        return NextResponse.json({
            error: 'An unexpected server error occurred.',
            details: process.env.NODE_ENV === 'development' ? e.message : undefined
        }, { status: 500 });
    }
}
