<script>
    import VizFeature from "$lib/components/VizFeature.svelte"
    import Network from "$lib/components/Network.svelte";
</script>

<header>
    <h1 id="name">Brianna Wilson -</h1>
    <h1 id="role">Designer & Engineer</h1>
</header>

<main>
    <div id="intro">
        <p>
            <span class="subheading">Making data human-friendly.</span> Using technologies like 3D, interactivity, and AR, I'm passionate about experimenting with new and effective ways to visualize information. My work has appeared in the Washington Post, Nightingale Journal of Data Visualization, and more
        </p>
    </div>
    
    <div id="projects">
        <h2>
            See what I'm working on
        </h2>
        <div class="project-list">
            <div class="project" style="margin-bottom:0.3rem;">
                <h3 class="project-name">
                    <a href="https://specialeducationdata.org/" target="_blank">AdaData</a>
                </h3>
                <p class="project-description">
                    > A tool to explore special education data around the US
                </p>
            </div>

            <div class="project">
                <h3 class="project-name">
                    <a href="https://adadata.ghost.io/" target="_blank">Leeway</a>
                </h3>
                <p class="project-description">
                    > Resources for learning creative coding and visualization
                </p>
            </div>
        </div>
    </div>
</main>

<footer>
    <h2>Get in touch</h2>
    <p id="email">briannadatajourn@proton.me</p>
    <a href="https://linkedin.com/in/briannawil" target="_blank"><i class="fab fa-linkedin"></i></a>
    <a href="https://github.com/bronna" target="_blank"><i class="fab fa-github"></i></a>
</footer>

<!-- <VizFeature /> -->
<Network />