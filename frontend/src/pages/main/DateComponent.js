import React, { useState } from 'react';
import '../../App.css';

const DateComponent = () => {
  const [date, setDate] = useState(new Date());

  const handlePrevWeek = () => {
    const prevWeek = new Date(date.getTime());
    prevWeek.setDate(prevWeek.getDate() - 7);
    setDate(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(date.getTime());
    nextWeek.setDate(nextWeek.getDate() + 7);
    setDate(nextWeek);
  };

  // 날짜를 'YYYY/MM/DD' 형식으로 반환하는 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // 주차 반환하는 함수
  const formatWeek = (date) => {
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const month = monthNames[date.getMonth()];
    const weekNumber = Math.ceil(date.getDate() / 7);
    return `${month} ${weekNumber}주차`;
  };

  return (
    <div className="rounded-rectangle1">
      {/* 둥근 모서리를 가진 직사각형 내부의 내용 */}
      <div>
        <span>Today {formatDate(new Date())}</span>
        <button onClick={handlePrevWeek}>&lt;</button>
        <span>{formatWeek(date)}</span>
        <button onClick={handleNextWeek}>&gt;</button>
      </div>
    </div>
  );
}

export default DateComponent;
