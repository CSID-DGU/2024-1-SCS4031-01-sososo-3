import React, { useState } from 'react';
import '../../App.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const DateComponent = ({ onDateChange, groupCode}) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const navigate = useNavigate();
  const handleExit = () => {
    if (groupCode) {
      navigate(`/division/${groupCode}`); // Navigate to /team/groupCode
    } else {
      navigate('/division'); // Fallback in case groupCode is not available
    }
  };
  
  const handlePrevWeek = () => {
    const prevWeek = new Date(date.getTime());
    prevWeek.setDate(prevWeek.getDate() - 7);
    setDate(prevWeek);
    onDateChange(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(date.getTime());
    nextWeek.setDate(nextWeek.getDate() + 7);
    setDate(nextWeek);
    onDateChange(nextWeek);
  };

  const formatWeek = (date) => {
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const month = monthNames[date.getMonth()];
    const weekNumber = Math.ceil(date.getDate() / 7);
    return `${month} ${weekNumber}주차`;
  };

  const handleWeekClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setDate(date);
    setShowCalendar(false);
    onDateChange(date);
  };

  // Custom header to format month as YYYY.MM
  const CustomHeader = ({ date, decreaseMonth, increaseMonth }) => (
    <div className="react-datepicker__header-custom">
      <button onClick={decreaseMonth}>
        <IoIosArrowBack />
      </button>
      <span>{format(date, 'yyyy.MM')}</span> {/* YYYY.MM 형식으로 표시 */}
      <button onClick={increaseMonth}>
        <IoIosArrowForward />
      </button>
    </div>
  );

  return (
    <div>
      <div className='employee-header2'>
        <button className="exit-button2" onClick={handleExit}>
          나가기 {/* 나가기 텍스트 */}
        </button>

        <div className='datebutton'>
          <button onClick={handlePrevWeek}>
            <IoIosArrowBack />
          </button>
          <button className='date week' onClick={handleWeekClick}>
            {formatWeek(date)}
          </button>
          <button onClick={handleNextWeek}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      {showCalendar && (
        <div className="calendar-container">
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            inline
            renderCustomHeader={CustomHeader} // Custom header 적용
            dateFormat="yyyy.MM.dd"  // 날짜 형식
          />
        </div>
      )}
    </div>
  );
}

export default DateComponent;
