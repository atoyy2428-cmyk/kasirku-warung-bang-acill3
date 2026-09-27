const SUPABASE_URL =
    "https://hvfhafobzlneprjyrcst.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_iGuVwNzocEsZxi92GTjqEw_zW_mQYkE";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
    async function tesKoneksiSupabase() {
    try {
        const { data, error } = await supabaseClient
            .from("profiles")
            .select("id")
            .limit(1);

        if (error) {
            console.error("Supabase error:", error);
            return false;
        }

        console.log("Koneksi Supabase berhasil!", data);
        return true;

    } catch (error) {
        console.error("Koneksi gagal:", error);
        return false;
    }
}

tesKoneksiSupabase();