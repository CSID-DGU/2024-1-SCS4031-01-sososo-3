import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';
import { IoPeopleOutline } from 'react-icons/io5';
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
        <div className="organization">
            {/* 팀 데이터 렌더링 */}
            {teamInf && (
                <div key={team.groupCode}>
                    <Link key={team.leaderRoomId} to={`/share1/${team.leaderRoomId}`} className="member-link">
                    <div className="member-card1">
                        <h2>
                            <IoPeopleOutline /><span> </span>
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
                    <div key={member._id}>
                        <Link to={`/${member.roomId}`} className="member-link">
                            <div className="member-card2">
                                <h2>
                                    <IoPersonOutline /><span> </span>
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
