// supabaseClient.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://miyxplwuzubxlwbolsmq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1peXhwbHd1enVieGx3Ym9sc21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyMTE3NzEsImV4cCI6MjA0Mjc4Nzc3MX0.3ERCtJQ53RowSzX6fUb9tq15lVorujl6Uu8yWoKR1EQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
});
