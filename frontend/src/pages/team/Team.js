import React from 'react';
import { Link } from 'react-router-dom';
import { RiTeamLine } from 'react-icons/ri';
import { IoPersonOutline } from 'react-icons/io5';
import '../../App.css';

const Team = () => {
    const fakeTeamMembers = [
        //임시 DB
        { id: 1, name: '시스템영업1팀', position: 'Team' },
        { id: 2, name: '  김미소', position: 'Developer' },
        { id: 3, name: '  박소정', position: 'Designer' },
        { id: 4, name: '  최소영', position: 'Project Manager' },
        { id: 5, name: '  김민정', position: 'Developer' },
        { id: 6, name: '  아무개', position: 'Designer' }
    ];

    const sortedMembers = fakeTeamMembers.sort((a, b) => a.id - b.id);

    // 시스템영업1팀 멤버를 따로 분리
    const teamMember = sortedMembers.find(member => member.id === 1);
    const otherMembers = sortedMembers.filter(member => member.id !== 1);

    return (
        <div>
            {/* 시스템영업1팀 박스를 컨테이너 밖으로 렌더링 */}
            <div key={teamMember.id} className="member-link-container first-card">
                <Link to={`/team/${teamMember.id}`} className="member-link">
                    <div className="member-card first-card">
                        <h2>
                            <RiTeamLine />
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
                        <Link to={`/team/${member.id}`} className="member-link">
                            <div className="member-card other-cards">
                                <h2>
                                    <IoPersonOutline />
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

export default Team;
