// DirectorPage.js (혹은 Director 컴포넌트)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { SiMicrosoftteams } from "react-icons/si";
import { BsPersonWorkspace } from "react-icons/bs";

const Director = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/groupsget');
                if (!response.ok) {
                    throw new Error('Failed to fetch members');
                }
                const data = await response.json();
                console.log('Fetched members:', data); // 데이터를 잘 받아오는지 확인
                setMembers(data);
            } catch (error) {
                console.error('Failed to fetch members:', error);
            }
        };

        fetchMembers();
    }, []);

    const sortedMembers = members.sort((a, b) => a.groupCode.localeCompare(b.groupCode));
    const teamMember = sortedMembers.find(member => member.groupLevel === "3");
    const otherMembers = sortedMembers.filter(member => member.groupLevel === "2");

    return (
        <div>
            {teamMember && (
                <div key={teamMember.groupCode} className="member-link-container first-card">
                    <Link to={`/share3/${teamMember.leaderRoomId}`} className="member-link">
                        <div className="member-card first-card">
                            <h2>
                                <BsPersonWorkspace />
                                {teamMember.groupName}
                            </h2>
                            <p>Director</p>
                        </div>
                    </Link>
                </div>
            )}

            <div className="organization-container">
                {otherMembers.map(member => (
                    <div key={member.groupCode} className="member-link-container other-cards">
                        <Link to={`/division/${member.groupCode}`} className="member-link">
                            <div className="member-card other-cards">
                                <h2>
                                    <SiMicrosoftteams />
                                    {member.groupName}
                                </h2>
                                <p>Division</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Director;
