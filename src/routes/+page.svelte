<script>
    import Network from "$lib/components/Network.svelte"
</script>

<header>
    <h1 id="name">Brianna Wilson -</h1>
    <h1 id="role">Designer & Engineer</h1>
</header>

<main>
    <div id="intro">
        <p>
            <span class="subheading">Making data human-friendly.</span> Using technologies like 3D, web interactivity, and AR, Brianna explores novel and engaging ways to visualize information. Her work has appeared in the Washington Post, Nightingale Journal of Data Visualization, and more. Her training started at Stanford in the Product Design program, after which she worked as a product design engineer at Apple on the first several iPads. Since then, she's started a sustainable toy company, completed the Lede Program at Columbia, and continues her work in data journalism and communication design.
        </p>
    </div>
    
    <div id="projects">
        <h2>
            Recent projects
        </h2>
        <div class="project-list">
            <div class="project" style="margin-bottom:0.3rem;">
                <h3 class="project-name">
                    <a href="https://specialeducationdata.org/">IEPData</a>
                </h3>
                <p class="project-description">
                    > A tool to explore special education data
                </p>
            </div>

            <div class="project">
                <h3 class="project-name">
                    <a href="https://leeway.studio/">Leeway</a>
                </h3>
                <p class="project-description">
                    > Resources for creative coding and visualization
                </p>
            </div>
        </div>
    </div>
</main>

<footer>
    <h2>Get in touch</h2>
    <p id="email">briannadatajourn@proton.me</p>
    <a href="https://linkedin.com/in/briannawil">LinkedIn</a>
    <a href="https://github.com/bronna">Github</a>
    <a href="https://observablehq.com/@bronna">Observable</a>
    <a href="https://x.com/bronna">Twitter</a>
</footer>

<Network />

<style>
    .project-description {
        height: 0;
    }

    footer {
        margin-bottom: 1.5rem;
    }
</style>