import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";

export default function Handler(props: unknown) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-secondary/40 px-4 py-12">
      <div className="w-full max-w-md">
        <StackHandler fullPage={false} app={stackServerApp} routeProps={props} />
      </div>
    </div>
  );
}
