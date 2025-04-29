import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-y-10 min-h-screen">
      <Button variant="elevated">Hello</Button>
      <div>
        <Input placeholder="Input" />
      </div>
      <Progress value={50} />
    </div>
  );
}
