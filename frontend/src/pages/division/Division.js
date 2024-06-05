import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RiTeamLine } from 'react-icons/ri';
import { SiMicrosoftteams } from 'react-icons/si';
import '../../App.css';

const DivisionPage = () => {
    const { leaderRoomId } = useParams();
    const [teams, setTeams] = useState([]);
    const [divisions, setDivisions] = useState([]); // 빈 배열로 초기화

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/groupsget`);
                if (!response.ok) {
                    throw new Error('Failed to fetch teams');
                }
                const data = await response.json();

                const currentDivision = data.find(division => division.groupCode === leaderRoomId);
                setDivisions(currentDivision ? [currentDivision] : []); // 배열로 설정

                // 필터링: parentGroupCode가 현재 리더의 leaderRoomId인 팀들만 추출
                const filteredTeams = data.filter(team => team.parentGroupCode === leaderRoomId);
                setTeams(filteredTeams);
            } catch (error) {
                console.error('Failed to fetch teams:', error);
            }
        };

        fetchTeams();
    }, [leaderRoomId]);

    // 시스템사업본부를 따로 분리
    const teamMember = divisions.find(member => member.groupLevel === "2"); // Division Level
    const otherMembers = teams.filter(member => member.groupLevel === "1"); // Team Level

    return (
        <div>
            {/* 시스템사업본부 박스를 컨테이너 밖으로 렌더링 */}
            {teamMember && (
                <div key={teamMember.groupCode} className="member-link-container first-card">
                    <Link to={`/division/${teamMember.leaderRoomId}`} className="member-link">
                        <div className="member-card first-card">
                            <h2>
                                <SiMicrosoftteams />
                                {teamMember.groupName}
                            </h2>
                            <p>Division</p>
                        </div>
                    </Link>
                </div>
            )}

            {/* 나머지 멤버를 organization-container 내부에 렌더링 */}
            <div className="organization-container">
                {otherMembers.map(member => (
                    <div key={member.groupCode} className="member-link-container other-cards">
                        <Link to={`/team/${member.groupCode}`} className="member-link">
                            <div className="member-card other-cards">
                                <h2>
                                    <RiTeamLine />
                                    {member.groupName}
                                </h2>
                                <p>Team</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DivisionPage;
