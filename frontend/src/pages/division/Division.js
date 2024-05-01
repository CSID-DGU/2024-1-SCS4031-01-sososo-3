import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Division = () => {
    const fakedivisionMembers = [
        // 임시 DB
        { id: 1, name: '시스템영업1팀', position: 'Team'},
        { id: 2, name: '시스템영업2팀', position: 'Team' },
        { id: 3, name: '공공영업1팀', position: 'Team' },
        { id: 4, name: '공공영업2팀', position: 'Team' },
        { id: 5, name: '기술지원팀', position: 'Team' }
    ];

    // id를 기준으로 오름차순 정렬
    const sortedMembers = fakedivisionMembers.sort((a, b) => a.id - b.id);

    return (
        <div className="organization-container">
            {sortedMembers.map(member => (
                <Link key={member.id} to={`/division/${member.id}`} className="member-link">
                    <div className="member-card">
                        <h2>{member.name}</h2>
                        <p>{member.position}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Division;