/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";
type Props = {
  onUpload: (results: any) => void;
};

export default function UploadButton({ onUpload }: Props) {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button {...getRootProps()} className="w-full lg:w-auto" size="sm">
          <Upload className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  );
}
