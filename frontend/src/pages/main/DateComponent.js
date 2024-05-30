import React, { useState } from 'react';
import '../../App.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateComponent = ( {onDateChange} ) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const navigate = useNavigate();
  const handleExit = () => {
    navigate('/team'); // 나가기 버튼 클릭 시 '/team' 페이지로 이동
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

  // 날짜를 'YYYY/MM/DD' 형식으로 반환하는 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 주차 반환하는 함수
  const formatWeek = (date) => {
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const month = monthNames[date.getMonth()];
    const weekNumber = Math.ceil(date.getDate() / 7);
    return `${month} ${weekNumber}주차`;
  };

  //캘린더
  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setDate(date);
    setShowCalendar(false);
    onDateChange(date);
  };

  return (
    <div>
    <div className='employee-header2'>

      <button className="exit-button2" onClick={handleExit}>
          <GiExitDoor /> {/* 나가기 아이콘 */}
        </button>
        
      <div className='datebutton'>
        <button onClick={handlePrevWeek}>
          <IoIosArrowBack/>
        </button>
        <span className='date'>{formatWeek(date)}</span>
        <button onClick={handleNextWeek}>
         <IoIosArrowForward/>
        </button>
      </div>

      <div className="date-header">
        <div className="today">
          <span>Today</span>
        </div>
        <div className='date'>
          {formatDate(new Date())}
        </div>
        <FaCalendarAlt onClick={handleCalendarClick} />
      </div>
    </div>
    {showCalendar && (
          <div className="calendar-container">
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              inline
            />
          </div>
        )}
    </div>
  );
}

export default DateComponent;