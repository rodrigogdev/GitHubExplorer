import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Header, Issues, RepositoryInfo } from "./styles";

import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

interface Repository {
	full_name: string;
	description: string;
	owner: {
		login: string;
		avatar_url: string;
	};
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
}

interface Issue {
	title: string;
	id: number;
	user: {
		login: string;
	};
	html_url: string;
}

function Repository() {
	const [repository, setRepository] = useState<Repository | null>(null);
	const [issues, setIssues] = useState<Issue[]>([]);

	const params = useParams();

	useEffect(() => {
		api.get(`repos/${params.owner}/${params.repo}`).then((response) => {
			setRepository(response.data);
		});

		api.get(`repos/${params.owner}/${params.repo}/issues`).then((response) => {
			setIssues(response.data);
		});
	}, [params]);

	return (
		<>
			<Header>
				<img src={logoImg} alt="Github Explorer" />
				<Link to="/">
					<FiChevronLeft size={16} />
					Voltar
				</Link>
			</Header>

			{repository && (
				<RepositoryInfo>
					<header>
						<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
						/>
						<div>
							<strong>{repository.full_name}</strong>
							<p>{repository.description}</p>
						</div>
					</header>
					<ul>
						<li>
							<strong>{repository.stargazers_count}</strong>
							<span>Stars</span>
						</li>
						<li>
							<strong>{repository.forks_count}</strong>
							<span>Forks</span>
						</li>
						<li>
							<strong>{repository.open_issues_count}</strong>
							<span>Issues Abertas</span>
						</li>
					</ul>
				</RepositoryInfo>
			)}

			<Issues>
				{issues.map((issue) => (
					<a key={issue.id} href={issue.html_url}>
						<div>
							<strong>{issue.title}</strong>
							<p>{issue.user.login}</p>
						</div>

						<FiChevronRight size={20} />
					</a>
				))}
			</Issues>
		</>
	);
}

export default Repository;
