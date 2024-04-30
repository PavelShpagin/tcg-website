import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = createClient();
  const { data: classes } = await supabase.from("class").select();
  console.log(classes);
  return <pre>{JSON.stringify(classes, null, 2)}</pre>
}