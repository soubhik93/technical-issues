import { useState, useEffect } from "react"


const fetchRepositories = () => {
    
    const fetchRepositoriesForPage = (page) => {
        //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const gitHubApi = `https://api.github.com/search/repositories?q=topic%3Asoubhik-test&per_page=50&page=${page}`;
        return fetch(gitHubApi)
        .then(response => response.items.map(it => ({
            repositoryName : it.name,
            issuesUrl : it.issues_url
        })))
        .catch(() => [])
    } 

    const fetchRepositoriesRecursive = (acc, page) => {
        return fetchRepositoriesForPage(page)
        .then(repos => {
            return (repos.length === 0 || page === 2) ? acc : fetchRepositoriesRecursive(acc.concat(repos), page + 1)
        })
        .catch(() => acc)
    }

    return fetchRepositoriesForPage(1);
}


const fetchAllIssues = (repositories) => {
    return Promise.all(repositories).then(it => it.flat);
}

export const useAllIssues = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [issues, setIssues] = useState([]);
    
    useEffect(() => {
        async function getIssues() {
            setIsLoading(true);
            const repos = await fetchRepositories();
            setIssues(repos.map(it => it.repositoryName))
            setIsLoading(false);
        }
        getIssues();
        
    },[])


    return {isLoading, issues};
}