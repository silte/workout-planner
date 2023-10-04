import { ChangeEvent, useCallback, useMemo, useState } from 'react';

export const TEMPLATE_FILENAME_EXTENSION = '.workout-planner.json';

export const useHandleFileUpload = <DataType = any>() => {
  const [uploadedUserData, setUploadedUserData] = useState<DataType | null>(
    null,
  );
  const [overrideFilename, setOverrideFilename] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      const { files } = changeEvent.target;
      const targetFile = files?.item(0);
      if (!targetFile) {
        setOverrideFilename(null);
        setUploadedUserData(null);
        setError('Tiedoston lataaminen epäonnistui');
        return;
      }

      const fr = new FileReader();
      fr.onload = (readerEvent) => {
        if (
          readerEvent?.target?.result &&
          typeof readerEvent?.target?.result === 'string'
        ) {
          const result = JSON.parse(readerEvent.target.result);
          setUploadedUserData(result);
          setOverrideFilename(targetFile.name);
        } else {
          setError('Tiedoston lataaminen epäonnistui');
        }
      };
      fr.readAsText(targetFile);
    },
    [],
  );

  return useMemo(
    () => ({
      uploadedUserData,
      overrideFilename,
      error,
      handleFileChange,
    }),
    [error, handleFileChange, overrideFilename, uploadedUserData],
  );
};
