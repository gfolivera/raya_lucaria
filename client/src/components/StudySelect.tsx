interface Props {
  study_hours: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
  handleStudySubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function StudySelect({
  study_hours,
  handleChange,
  id,
  handleStudySubmit,
}: Props) {
  return (
    <>
      <select value={study_hours} id={id} onChange={(e) => handleChange(e)}>
        <option key="none" value="0">
          ...
        </option>
        <option key="morning" value="6">
          Até manhã
        </option>
        <option key="noon" value="12">
          Até dia
        </option>
        <option key="dusk" value="18">
          Até noite
        </option>
        <option key="midnight" value="24">
          Até meia-noite
        </option>
      </select>
      <button
        type="button"
        name={id}
        onClick={(event) => handleStudySubmit(event)}
      >
        Estudar
      </button>
    </>
  );
}
