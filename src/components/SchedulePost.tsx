import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from '../utils/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SchedulePost: React.FC = () => {
    const [post, setPost] = useState<string>('');
    const [scheduleDate, setScheduleDate] = useState<Date | null>(new Date());

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/schedule-post', { post, scheduleDate });
            console.log('Publicación programada:', response.data);
            window.location.href = 'http://localhost:5000/auth/linkedin';
        } catch (error) {
            console.error('Error al programar la publicación:', error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <textarea
                value={post}
                onChange={handleChange}
                placeholder="Escribe tu publicación..."
                className="border p-2 w-full"
            />
            <div className="mt-4">
                <label className="block mb-2">Selecciona la fecha y hora:</label>
                <DatePicker
                    selected={scheduleDate}
                    onChange={(date: Date | null) => setScheduleDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="border p-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Programar Publicación</button>
        </form>
    );
};

export default SchedulePost;