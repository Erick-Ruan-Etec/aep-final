import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const URL = "https://vyqsplfiumuzwanqmkwt.supabase.co";
const KEY = "sb_publishable_5087vG-dBzrqvADod46k2Q_y5Um6KNI";

export const supabaseClient = createClient(URL, KEY);