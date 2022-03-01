import { useContext } from 'react';
import SchedulesContext from '../context/SchedulesContext';

const useSchedules = () => useContext(SchedulesContext);

export default useSchedules;
