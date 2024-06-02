import React from 'react';
import { Link } from 'react-router-dom';
import { RiTeamLine } from 'react-icons/ri';
import { SiMicrosoftteams } from "react-icons/si";
import '../../App.css';

const Division = () => {
    const fakedivisionMembers = [
        // 임시 DB
        { id: 1, name: '  시스템사업본부', position: 'Division'},
        { id: 2, name: '  시스템영업1팀', position: 'Team'},
        { id: 3, name: '  시스템영업2팀', position: 'Team' },
        { id: 4, name: '  공공영업1팀', position: 'Team' },
        { id: 5, name: '  공공영업2팀', position: 'Team' },
        { id: 6, name: '  기술지원팀', position: 'Team' }
    ];

    const sortedMembers = fakedivisionMembers.sort((a, b) => a.id - b.id);

    // 시스템사업본부를 따로 분리
    const teamMember = sortedMembers.find(member => member.id === 1);
    const otherMembers = sortedMembers.filter(member => member.id !== 1);

    return (
        <div>
            {/* 시스템사업본부 박스를 컨테이너 밖으로 렌더링 */}
            <div key={teamMember.id} className="member-link-container first-card">
                <Link to={`/divisiion/${teamMember.id}`} className="member-link">
                    <div className="member-card first-card">
                        <h2>
                            <SiMicrosoftteams />
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
                        <Link to={`/division/${member.id}`} className="member-link">
                            <div className="member-card other-cards">
                                <h2>
                                    <RiTeamLine />
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

export default Division;