import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { BASE_URL } from '../url';

const WorkoutForm = () => {

    const [title, setTitle] = useState('');
    const [load , setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyfields] = useState([]);


    const { dispatch } = useWorkoutsContext(); 
    const { user } = useAuthContext();


    const handleSubmit = async (e) => {
        e.preventDefault();


        if(!user){
            setError('You  must be logged in');
            return;
        }
        const workout = { title, load, reps};

        const response = await fetch(`${BASE_URL}/api/workouts`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
            setEmptyfields(json.emptyFields);

        }

        if(response.ok){
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyfields([]);
            // console.log('new workout added');
            dispatch({ type: 'CREATE_WORKOUT', payload: json});
        }
    }

    // console.log(emptyFields);

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Workout Routine</h3>

        <label>Title of Exercise: </label>
        <input type='text' className={emptyFields.includes('title') ? 'error':''} value={title} onChange={(e) => setTitle(e.target.value)} />
    
        <label>Load (in kg): </label>
        <input type='number' className={emptyFields.includes('load') ? 'error':''} value={load} onChange={(e) => setLoad(e.target.value)} />

        <label>Reps Count: </label>
        <input type='text' className={emptyFields.includes('reps') ? 'error':''} value={reps} onChange={(e) => setReps(e.target.value)} />

        <button type='submit' className=''>Add Workout</button>

        { error && <div className='error'>{error}</div>}
    </form>
  )
};


export default WorkoutForm;
