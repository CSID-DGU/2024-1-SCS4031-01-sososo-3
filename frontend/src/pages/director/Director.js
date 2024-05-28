import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { SiMicrosoftteams } from "react-icons/si";
import { BsPersonWorkspace } from "react-icons/bs";

const Director = () => {
    const fakedirectorMembers = [
        // 임시 DB
        { id:1, name:'  대표이사', position: 'Director'},
        { id: 2, name: '  경영지원본부', position: 'Division'},
        { id: 3, name: '  SM사업본부', position: 'Division' },
        { id: 4, name: '  시스템사업본부', position: 'Division' },
        { id: 5, name: '  개발사업부', position: 'Division' }
    ];

    const sortedMembers = fakedirectorMembers.sort((a, b) => a.id - b.id);

    //  대표이사를 따로 분리
    const teamMember = sortedMembers.find(member => member.id === 1);
    const otherMembers = sortedMembers.filter(member => member.id !== 1);

    return (
        <div>
            {/* 대표이사 박스를 컨테이너 밖으로 렌더링 */}
            <div key={teamMember.id} className="member-link-container first-card">
                <Link to={`/director/${teamMember.id}`} className="member-link">
                    <div className="member-card first-card">
                        <h2>
                            <BsPersonWorkspace />
                            {teamMember.name}
                        </h2>
                        <p>{teamMember.position}</p>
                    </div>
                </Link>
            </div>

            {/* 나머지 멤버를 organization-container 내부에 렌더링 */}
            <div className="organization-container">
                {otherMembers.map(member => (
                    <div key={member.id} className="member-link-container other-cards">
                        <Link to={`/director/${member.id}`} className="member-link">
                            <div className="member-card other-cards">
                                <h2>
                                    <SiMicrosoftteams />
                                    {member.name}
                                </h2>
                                <p>{member.position}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Director;