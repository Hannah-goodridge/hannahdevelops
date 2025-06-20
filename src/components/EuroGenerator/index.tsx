'use client';

/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import PageWrapper from '@components/PageWrapper';

const teams: { [key: string]: { id: number; name: string; group: string; icon: string; strength: number } } = {
  Albania: { id: 1, name: 'Albania', group: 'B', icon: '🇦🇱', strength: 3 },
  Austria: { id: 2, name: 'Austria', group: 'D', icon: '🇦🇹', strength: 6 },
  Belgium: { id: 3, name: 'Belgium', group: 'E', icon: '🇧🇪', strength: 10 },
  Croatia: { id: 4, name: 'Croatia', group: 'B', icon: '🇭🇷', strength: 7 },
  CzechRepublic: { id: 5, name: 'Czech Republic', group: 'F', icon: '🇨🇿', strength: 5 },
  Denmark: { id: 6, name: 'Denmark', group: 'C', icon: '🇩🇰', strength: 7 },
  England: { id: 7, name: 'England', group: 'C', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', strength: 9 },
  France: { id: 8, name: 'France', group: 'D', icon: '🇫🇷', strength: 10 },
  Georgia: { id: 9, name: 'Georgia', group: 'F', icon: '🇬🇪', strength: 2 },
  Germany: { id: 10, name: 'Germany', group: 'A', icon: '🇩🇪', strength: 9 },
  Hungary: { id: 11, name: 'Hungary', group: 'A', icon: '🇭🇺', strength: 4 },
  Italy: { id: 12, name: 'Italy', group: 'B', icon: '🇮🇹', strength: 8 },
  Netherlands: { id: 13, name: 'Netherlands', group: 'D', icon: '🇳🇱', strength: 8 },
  Poland: { id: 14, name: 'Poland', group: 'D', icon: '🇵🇱', strength: 6 },
  Portugal: { id: 15, name: 'Portugal', group: 'F', icon: '🇵🇹', strength: 7 },
  Romania: { id: 16, name: 'Romania', group: 'E', icon: '🇷🇴', strength: 4 },
  Scotland: { id: 17, name: 'Scotland', group: 'A', icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', strength: 5 },
  Serbia: { id: 18, name: 'Serbia', group: 'C', icon: '🇷🇸', strength: 5 },
  Slovakia: { id: 19, name: 'Slovakia', group: 'E', icon: '🇸🇰', strength: 4 },
  Slovenia: { id: 20, name: 'Slovenia', group: 'C', icon: '🇸🇮', strength: 3 },
  Spain: { id: 21, name: 'Spain', group: 'B', icon: '🇪🇸', strength: 9 },
  Switzerland: { id: 22, name: 'Switzerland', group: 'A', icon: '🇨🇭', strength: 6 },
  Turkey: { id: 23, name: 'Turkey', group: 'F', icon: '🇹🇷', strength: 5 },
  Ukraine: { id: 24, name: 'Ukraine', group: 'E', icon: '🇺🇦', strength: 6 },
};

function seedableRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const shuffleArray = (array: any[], seed: number) => array.sort(() => seedableRandom(seed) - 0.5);

const EuroGenerator = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [participants, setParticipants] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState('');
  const [method, setMethod] = useState('random');
  const [currentMethod, setCurrentMethod] = useState('');
  const [generateCount, setGenerateCount] = useState(0);

  const addParticipant = (participant: string | undefined) => {
    if (!participant || participant.trim() === '') {
      setError('Oops! Please enter a valid participant');
      return;
    }
    if (participants.includes(participant)) {
      setError('Oops! That participant already exists');
      return;
    }
    setError('');
    setParticipants([...participants, participant]);
  };

  const reset = () => {
    setParticipants([]);
    setAssignments([]);
    setReveal(false);
    router.push(pathname);
  };

  const generate = useCallback(() => {
    const seed = participants.length;
    const shuffledParticipants = shuffleArray([...participants], seed);

    let sortedTeamKeys: string[];
    switch (method) {
      case 'strength':
        sortedTeamKeys = Object.keys(teams).sort((a, b) => teams[b].strength - teams[a].strength);
        break;
      case 'combined':
        const sortedKeys = Object.keys(teams).sort((a, b) => teams[b].strength - teams[a].strength);
        const half = Math.ceil(sortedKeys.length / 2);
        const topHalf = sortedKeys.slice(0, half);
        const bottomHalf = sortedKeys.slice(half);
        sortedTeamKeys = [];
        for (let i = 0; i < topHalf.length || i < bottomHalf.length; i++) {
          if (i < topHalf.length) {
            sortedTeamKeys.push(topHalf[i]);
          }
          if (i < bottomHalf.length) {
            sortedTeamKeys.push(bottomHalf[i]);
          }
        }
        break;
      case 'alternating':
        const sKeys = Object.keys(teams).sort((a, b) => teams[b].strength - teams[a].strength);
        sortedTeamKeys = [];
        while (sKeys.length) {
          sortedTeamKeys.push(sKeys.shift() as string);
          if (sKeys.length) {
            sortedTeamKeys.push(sKeys.pop() as string);
          }
        }
        break;
      case 'even':
        const teamKeys = Object.keys(teams);
        const teamsPerParticipant = Math.floor(teamKeys.length / participants.length);
        sortedTeamKeys = [];

        for (let i = 0; i < participants.length; i++) {
          const start = i * teamsPerParticipant;
          const end = start + teamsPerParticipant;
          sortedTeamKeys.push(...teamKeys.slice(start, end));
        }
        break;
      case 'random':
      default:
        sortedTeamKeys = shuffleArray(Object.keys(teams), seed);
        break;
    }

    const initialAssignments = shuffledParticipants.map((participant, index) => ({
      participant,
      team: teams[sortedTeamKeys[index % shuffledParticipants.length]],
      id: `${index}-${participant}-${sortedTeamKeys[index % shuffledParticipants.length]}`,
    }));

    const remainingTeams = shuffleArray(sortedTeamKeys.slice(shuffledParticipants.length), seed);

    const finalAssignments = [
      ...initialAssignments,
      ...remainingTeams.map((team, index) => ({
        participant: shuffledParticipants[index % shuffledParticipants.length],
        team: teams[team],
        id: `${index}-${shuffledParticipants[index % shuffledParticipants.length]}-${team}`,
      })),
    ];

    setAssignments(finalAssignments);
    setReveal(participants.length > 1);
    setCurrentMethod(method);

    const simplifiedAssignments = finalAssignments.map(({ participant, team }) => ({
      participant,
      team: team.id,
      method,
    }));

    const stateStr = encodeURIComponent(JSON.stringify({ assignments: simplifiedAssignments }));
    router.push(`${pathname}?state=${stateStr}`);
  }, [participants, method, pathname, router]);

  const prevParticipantsRef = useRef<string[]>();

  useEffect(() => {
    if (currentMethod !== method) {
      setReveal(false);
    }
  }, [method, currentMethod]);

  useEffect(() => {
    prevParticipantsRef.current = participants;
  }, [participants]);

  useEffect(() => {
    const stateStr = searchParams.get('state');
    if (stateStr) {
      const { assignments: stateAssignments } = JSON.parse(decodeURIComponent(stateStr));
      const assignmentsWithTeams = stateAssignments.map(({ participant, team }: { participant: string; team: number }) => ({
        participant,
        team: Object.values(teams).find(t => t.id === team),
      }));
      const stateParticipants = assignmentsWithTeams.map((assignment: any) => assignment.participant);
      const uniqueParticipants = [...new Set(stateParticipants)] as string[];

      setAssignments(assignmentsWithTeams as any[]);
      setParticipants(uniqueParticipants);
      setMethod(stateAssignments[0].method);
      setReveal(true);
    }
  }, [searchParams]);

  const printTable = () => {
    const printWindow = window.open('', '_blank');
    const tableHtml = document.querySelector('.print-table')?.outerHTML;
    const teamsHTML = document.querySelector('.print-teams')?.outerHTML;

    if (printWindow && tableHtml && teamsHTML) {
      printWindow.document.write(`
      <html>
        <head>
          <title>Euro 2024 Team generator</title>
          <style>
            body { font-family: 'Arial', sans-serif; font-size: 16px; color: #000; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            a { color: #000; text-decoration: none; }
            li { list-style: none; padding: 0 5px; }
          </style>
        </head>
        <body>
          ${tableHtml}
          ${teamsHTML}
          <script type="text/javascript">
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
      printWindow.document.close();
    }
  };

  return (
    <PageWrapper>
      <section className=" bg-no-repeat bg-white dark:bg-primary text-primary dark:text-white  lg:min-h-full py-32 px-4 xl:px-0">
        <div className="max-w-xl lg:max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-center pt-12 lg:pt-32 xl:px-0 px-4 relative">
          <div className="w-full lg:w-2/3 overflow-hidden  flex flex-col gap-8 justify-items-center text-center items-center">
            <h1 className="text-5xl text-shadow lg:text-8xl font-bold leading-none relative anim-slide-in-bottom text-center ">
              Euro 2024 Table Generator
            </h1>
            <p>Welcome to the Euro 2024 tournament team generator! Here's how it works:</p>
            <p>
              You can enter the names of the participants. Once you've added all participants, click 'Generate' to assign them to teams for
              the Euro 2024 tournament. You can choose the sorting method for the teams, and the teams will be assigned to the participants
              in a fair way.
            </p>
            <p>
              After the teams are generated in a table for each participant, you can easily share the results with your friends or print it
              out. Enjoy your Euro 2024 tournament!
            </p>
            <p> Sorting and filtering: How it works</p>
            <p>
              We believe in fairness, and that's why we've implemented a shuffling process in our team generator. In the 'strength' method,
              the teams are sorted by their strength and assigned in that order. The strongest team will always be first, the second
              strongest team will always be second, and so on.
            </p>
            <p>
              In the 'random' method, the teams are assigned in a random order. This method is perfect for those who want a completely
              random assignment of teams.
            </p>
            <p>
              The 'stength and random' method is a mix of the 'strength' and 'random' methods. The teams are sorted by their strength, and
              then split into two groups. The first group is shuffled and assigned to the participants, and the second group is shuffled and
              assigned to the remaining participants.
            </p>
            <p>
              The 'alternating' method is a mix of the 'strength' and 'random' methods. The teams are sorted by their strength, and then
              assigned to the participants in an alternating order. The strongest team is first, the weakest team is last, and so on.
            </p>
            <p>
              The 'even' method is perfect for those who want to evenly distribute the teams among the participants. The teams are sorted by
              their strength, and then assigned to the participants in an even order. The first participant gets the strongest team, the
              second participant gets the second strongest team, and so on.
            </p>
            <p>Teams and their strength valuation:</p>
            <ul className="flex flex-row items-center text-center justify-center flex-wrap gap-4">
              {Object.keys(teams)
                .sort((a, b) => teams[b].strength - teams[a].strength)
                .map(team => (
                  <li key={team}>
                    {teams[team].icon} {teams[team].name} - Strength: {teams[team].strength}
                  </li>
                ))}
            </ul>
            <hr className="border dark:border-white  border-primary w-full" />
            <div className="flex flex-col lg:flex-row justify-center items-center  gap-3 w-full">
              <label htmlFor="participant" className="flex text-md">
                Add Participants
              </label>
              <div className="flex flex-col items-stretch h-full lg:w-1/3">
                <input
                  id="participant"
                  type="text"
                  ref={inputRef}
                  value={inputValue}
                  placeholder="Add participant"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight h-full "
                  onChange={event => setInputValue(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      addParticipant(inputRef.current?.value);
                      setInputValue('');
                      event.preventDefault();
                    }
                  }}
                />
              </div>
              <button
                onClick={() => addParticipant(inputRef.current?.value)}
                className="bg-highlight  h-full text-white  py-2 px-4 rounded flex"
                type="button"
              >
                Add Participant
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {participants.length > 0 && (
              <>
                <div className="flex flex-row gap-3">
                  <h3 className="text-xl">Current Participants :{participants.length} </h3>
                  <h3 className="text-xl">Current Teams :{Object.keys(teams).length} </h3>
                </div>
                <ul className="flex flex-col  flex-wrap gap-3 items-center w-2/3 border-t-2 dark:border-white border-primary pt-2">
                  {participants.map((participant, index) => (
                    <li
                      className="flex flex-row gap-4 justify-center items-center w-full border-b-2 pb-3 dark:border-white border-primary"
                      key={index}
                    >
                      <p className="flex text-xl font-bold w-1/3">{participant}</p>
                      <button
                        className=" flex bg-white text-primary font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => {
                          const newParticipants = participants.filter((_, i) => i !== index);
                          setParticipants(newParticipants);
                        }}
                      >
                        ❌<span className="hidden">Delete</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <label htmlFor="method" className="flex text-md">
              Choose Sorting Method
            </label>

            <select
              value={method}
              onChange={e => setMethod(e.target.value)}
              className="w-2/3 px-3 py-2 text-gray-700 border text-center rounded-lg focus:outline-none focus:shadow-outline"
            >
              <option value="random">Random</option>
              <option value="strength">By Strength of team</option>
              <option value="combined">By Strength of team and random</option>
              <option value="alternating">Alternating</option>
              <option value="even">Evenly distribute teams leaving off any extras</option>
            </select>

            {participants.length > 1 && (
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setGenerateCount(generateCount + 1);
                    generate();
                  }}
                  className="bg-highlight hover:bg-highlight text-white font-bold py-2 px-4 rounded  "
                >
                  Generate
                </button>
                <button onClick={reset} className="bg-highlight hover:bg-highlight text-white font-bold py-2 px-4 rounded   " type="button">
                  Reset
                </button>
                {reveal && participants.length > 1 && (
                  <button
                    className="bg-highlight hover:bg-highlight text-white font-bold py-2 px-4 rounded  "
                    type="button"
                    onClick={printTable}
                  >
                    Print Table
                  </button>
                )}
              </div>
            )}

            {reveal && participants.length > 1 && (
              <div className="overflow-auto w-full items-center flex justify-center">
                <table className="table-auto text-center w-full print-table">
                  <thead>
                    <tr className="border dark:border-white border-primary">
                      <th className="text-l lg:text-4xl p-2">Flag</th>
                      <th className="text-l lg:text-4xl">Team</th>
                      <th className="text-l lg:text-4xl">Group</th>
                      <th className="text-l lg:text-4xl">Person</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map(({ participant, team, id }) => (
                      <tr className="border dark:border-white border-primary" key={id}>
                        <td className="text-l lg:text-4xl p-2">{team.icon}</td>
                        <td className="text-l lg:text-4xl">{team.name}</td>
                        <td className="text-l lg:text-4xl">{team.group}</td>
                        <td className="text-l lg:text-4xl">
                          <a href="#your-teams" className="underline">
                            {participant || 'No participant'}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      {reveal && (
        <section className=" bg-no-repeat bg-white dark:bg-secondary text-primary dark:text-white  py-32 px-4 xl:px-0">
          <div className="max-w-xl lg:max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-center xl:px-0 px-4 relative">
            <div className="flex flex-col gap-8 items-center print-teams">
              <h2
                id="your-teams"
                className="text-3xl text-shadow lg:text-8xl font-bold leading-none relative anim-slide-in-bottom text-center "
              >
                Your Teams
              </h2>
              <div className="flex flex-col lg:flex-row gap-3">
                {participants.map(participant => (
                  <div className="flex flex-col gap-3 items-center rounded border p-3 dark:border-white border-primary" key={participant}>
                    <p className="font-bold text-xl">
                      {participant}'s teams
                      <span className="text-sm"> ({assignments.filter((assignment: any) => assignment.participant === participant).length})</span>
                    </p>
                    <ul>
                      {assignments
                        .filter((assignment: any) => assignment.participant === participant)
                        .map(({ team }: any) => (
                          <li key={team.name}>
                            {team.icon} {team.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
};

export default EuroGenerator;