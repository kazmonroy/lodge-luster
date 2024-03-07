import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase'


const supabaseUrl = 'https://wgjzrjfkwsremzyxnsxm.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
