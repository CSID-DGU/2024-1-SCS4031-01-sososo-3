import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Team = () => {
    const fakeTeamMembers = [
        // 임시 DB
        { id: 1, name: '시스템영업1팀', position: 'Team'},
        { id: 2, name: '김미소', position: 'Developer' },
        { id: 3, name: '박소정', position: 'Designer' },
        { id: 4, name: '최소영', position: 'Project Manager' },
        { id: 5, name: '김민정', position: 'Develooper' },
        { id: 6, name: '아무개', position: 'Designer' }   
    ];

    // id를 기준으로 오름차순 정렬
    const sortedMembers = fakeTeamMembers.sort((a, b) => a.id - b.id);

    return (
        <div className="organization-container">
            {sortedMembers.map(member => (
                <Link key={member.id} to={`/team/${member.id}`} className="member-link">
                    <div className="member-card">
                        <h2>{member.name}</h2>
                        <p>{member.position}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Team;

