'use client';

import { AddWorkoutContainer } from '$containers/workout-templates/add-workout-template.container';
import { Container } from '$layouts/container/container';
import {
  TEMPLATE_FILENAME_EXTENSION,
  useHandleFileUpload,
} from '$utils/file-helper';

export default function ImportWorkoutTemplatePage() {
  const { uploadedUserData, handleFileChange, overrideFilename } =
    useHandleFileUpload();

  return (
    <div>
      <Container>
        <label
          htmlFor="selectFiles"
          className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium tracking-tight text-white transition duration-150 ease-in-out bg-gray-800 rounded-md cursor-pointer sm:w-auto focus:ring-2 focus:ring-offset-2 focus:outline-none hover:opacity-75 focus:opacity-75 focus:ring-gray-800"
        >
          Valitse tiedosto
          <input
            className="hidden"
            type="file"
            id="selectFiles"
            onChange={handleFileChange}
            accept={TEMPLATE_FILENAME_EXTENSION}
          />
        </label>
        <span className="ml-2">
          {overrideFilename || 'Ei tiedostoa valittuna'}
        </span>
      </Container>
      {uploadedUserData && (
        <AddWorkoutContainer importData={uploadedUserData} />
      )}
    </div>
  );
}
