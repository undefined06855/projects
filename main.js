const req = new XMLHttpRequest()
var json = {}

req.onreadystatechange = () => {
    if (req.readyState == 4 && req.status == 200)
    {
        console.log("Request successful.")

        json = JSON.parse(req.response)

        const stylesheet = document.createElement("style")

        var repid = 0
        json.forEach(repo => {
            if (!(repo.fork || repo.name === "undefined06855" || repo.name === "projects" || repo.archived || repo.private))
            {
                console.log(repo)
                document.getElementById("repo_wrapper").innerHTML +=
                reponame
                .replaceAll("[[TITLE]]", repo.name)
                .replaceAll("[[DESC]]", repo.description === null ? "(No description provided)" : repo.description)
                .replaceAll("[[ID]]", repid)
                .replaceAll("[[URL]]", repo.html_url)

                stylesheet.textContent +=
                style
                .replaceAll("[[ID]]", repid)
                .replaceAll("[[RAND]]", Math.random() * 3 - 1.5)
                .replaceAll("[[RAND2]]", Math.random() < .5 ? -7 : 7)

                repid++
            }
            else {console.log("Declined repo %s", repo.name)}
        })

        document.head.appendChild(stylesheet)
    }
    else console.log("state changed") 
}

req.open("get", "https://api.github.com/users/undefined06855/repos")
req.send()

window.addEventListener("resize", () => {
    if (document.body.offsetWidth < 450)
    {
        document.getElementById("repo_wrapper").classList.remove("row")
        document.getElementById("repo_wrapper").classList.add   ("column")
    }
    else
    {
        document.getElementById("repo_wrapper").classList.add   ("row")
        document.getElementById("repo_wrapper").classList.remove("column")
    }
})

if (document.body.offsetWidth < 450)
{
    document.getElementById("repo_wrapper").classList.remove("row")
    document.getElementById("repo_wrapper").classList.add   ("column")
}
else
{
    document.getElementById("repo_wrapper").classList.add   ("row")
    document.getElementById("repo_wrapper").classList.remove("column")
}

document.getElementById("corner_image").addEventListener("click", () => 
    window.location.href = "https://github.com/undefined06855"
)

document.getElementById("corner_click").addEventListener("click", () => 
    window.location.href = "https://github.com/undefined06855"
)
