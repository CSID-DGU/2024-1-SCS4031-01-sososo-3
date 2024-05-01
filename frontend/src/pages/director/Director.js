import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Director = () => {
    const fakedirectorMembers = [
        // 임시 DB
        { id: 1, name: '경영지원본부', position: 'Division'},
        { id: 2, name: 'SM사업본부', position: 'Division' },
        { id: 3, name: '시스템사업본부', position: 'Division' },
        { id: 4, name: '개발사업부', position: 'Division' }
    ];

    // id를 기준으로 오름차순 정렬
    const sortedMembers = fakedirectorMembers.sort((a, b) => a.id - b.id);

    return (
        <div className="organization-container">
            {sortedMembers.map(member => (
                <Link key={member.id} to={`/director/${member.id}`} className="member-link">
                    <div className="member-card">
                        <h2>{member.name}</h2>
                        <p>{member.position}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Director;