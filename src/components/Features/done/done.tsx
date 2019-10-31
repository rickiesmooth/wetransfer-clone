import React from "react";
import { Input } from "../../Elements/input/input";
import { Button } from "../../Elements/button/button";

import "./done.scss";

type Props = {
  link: string;
};

export const Done: React.FC<Props> = ({ link }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <div className="done">
      <Input readOnly value={link} inputRef={ref} />
      <div className="controls">
        <Button
          type="button"
          mode="outline"
          onClick={() => {
            const node = ref.current!;
            node.select();
            node.setSelectionRange(0, 99999);
            document.execCommand("copy");
          }}
        >
          Copy link
        </Button>
      </div>
    </div>
  );
};
