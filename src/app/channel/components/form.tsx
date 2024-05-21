"use client";

import { onEditBio } from "@/action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import React, { useState } from "react";

type Props = {
  userId: string;
  bio: string;
};

const EditForm = ({ bio, userId }: Props) => {
  const [value, setValue] = React.useState(bio);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSave() {
    setLoading(true);
    onEditBio(userId, value).finally(() => setLoading(false));
  }

  return (
    <section className="w-full relative">
      <Button
        className="absolute right-2 top-2 rounded"
        onClick={onSave}
        disabled={value === bio || loading}
      >
        <Save className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Textarea
        placeholder="Bio"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-40 lg:h-full border-primary dark:border-primary focus:bg-muted"
        
      />
    </section>
  );
};

export default EditForm;
