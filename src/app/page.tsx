import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <Button variant="elevated">Hello</Button>
        <div><Input placeholder="Input" /></div>
        <Progress value={50} />
    </div>
  );
}
