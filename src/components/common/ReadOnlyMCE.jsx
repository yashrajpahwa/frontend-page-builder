import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { PulseLoader } from "react-spinners";

const ReadOnlyMCE = ({ initialValue }) => {
  return (
    <Editor
      tinymceScriptSrc={
        "https://cdn.jsdelivr.net/npm/tinymce@7.6.0/tinymce.min.js"
      }
      init={{
        promotion: false,
        branding: false,
        editable_root: false,
        license_key: "gpl",
        inline: true,
      }}
      disabled={true}
      scriptLoading={
        <>
          <div className="flex items-center justify-center">
            <PulseLoader size={10} color={"#123abc"} loading={true} />
          </div>
        </>
      }
      value={initialValue}
    />
  );
};

export default ReadOnlyMCE;
