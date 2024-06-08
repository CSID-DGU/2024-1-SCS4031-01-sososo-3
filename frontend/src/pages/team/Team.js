import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';
import '../../App.css';

const Team = () => {
    const { groupCode } = useParams(); // URL에서 groupCode 가져오기
    const [team, setTeam] = useState([]); // 팀 데이터
    const [members, setMembers] = useState([]); // 팀 멤버 데이터

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                // 그룹 데이터 가져오기
                const response = await fetch(`http://localhost:3001/api/groupsget`);
                if (!response.ok) {
                    throw new Error('Failed to fetch group data');
                }
                const data = await response.json();

                // 현재 팀 데이터 찾기
                const currentTeam = data.find(group => group.groupCode === groupCode);
                setTeam(currentTeam);

                // 사용자 데이터 가져오기
                const userResponse = await fetch(`http://localhost:3001/api/users/${groupCode}`);
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await userResponse.json();
                setMembers(userData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchTeamData();
    }, [groupCode]);

    const teamInf = team
    const teamMembers = members;


    return (
        <div>
            {/* 팀 데이터 렌더링 */}
            {teamInf && (
                <div key={team.groupCode} className="member-link-container first-card">
                    <Link key={team.leaderRoomId} to={`/share1/${team.leaderRoomId}`} className="member-link">
                    <div className="member-card first-card">
                        <h2>
                            <IoPersonOutline />
                            {team.groupName}
                        </h2>
                        <p>Team</p>
                    </div>
                    </Link>
                </div>
            )}

            {/* 멤버 데이터 렌더링 */}
            <div className="organization-container">
                {teamMembers.map(member => (
                    <div key={member._id} className="member-link-container other-cards">
                        <Link to={`/${member.roomId}`} className="member-link">
                            <div className="member-card other-cards">
                                <h2>
                                    <IoPersonOutline />
                                    {member.name}
                                </h2>
                                {/* <p>{member.position}</p> */}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Team;
