import { useRecoilState, useRecoilValue } from "recoil";
import { hoursSeletor, minutesState } from "./min_hours/atoms_mh";

function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [hours, setHours] = useRecoilState(hoursSeletor);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="minutes"
      />
      <input
        onChange={onHoursChange}
        value={hours}
        type="number"
        placeholder="hours"
      />
    </div>
  );
}

export default App;
