import React,{ useEffect } from 'react'
import { BASE_URL } from '../url';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {


    const { state, dispatch } = useWorkoutsContext();
    // const workouts = state.workouts;

    const { user } = useAuthContext();

    useEffect(() => {
        const  fetchWorkouts = async () => {
            const response = await fetch(`${BASE_URL}/api/workouts`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json});
            }
        }
        if(user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    
  return (
    <div className='home'>
        <div className='workouts'>
            { state.workouts && state.workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} ></WorkoutDetails>
            ))}
        </div>  
        <WorkoutForm />
    </div>
  )
}


export default Home;