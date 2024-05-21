import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const LayoutView = async (props: PropsWithChildren) => {
  const session = await auth();
  if (!session) redirect("/");
  return <main className="p-5">{props.children}</main>;
};

export default LayoutView;
