---
layout: default2
---

## Temporal Observation



<div class="uk-accordion data-uk-accordion">
    <li class="uk-open">
        <a  class="uk-accordion-title" href>Item 1</a>
        <div class="uk-accordion-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
    </li>
    <li>
        <a class="uk-accordion-title" href>Item 2</a>
        <div class="uk-accordion-content">
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
        </div>
    </li>
    <li>
        <a class="uk-accordion-title" href>Item 3</a>
        <div class="uk-accordion-content">
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
        </div>
    </li>
</div>

<div class="uk-grid uk-child-width-1-2">
    <div>
        <div class="uk-card uk-card-hover uk-card-body uk-padding-small uk-text-center">
            <svg id="scatter"></svg>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-hover uk-card-body uk-padding-small uk-text-center">
            <svg id="box"></svg>
        </div>
    </div>
</div>

<div class="uk-grid uk-child-width-1-2">
    <div>
        <div class="uk-card uk-card-hover uk-card-body uk-padding-small uk-text-center">
            <svg id="scatter2"></svg>
        </div>
    </div>
</div>

<script>
    bar_plot("js/alphabet.csv", "#myplot");
    box_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#box", "h1 Word Count");
    scatter_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#scatter", "h1 Word Count");
    scatter_plot("js/24.6.2024.all_queries_domains_with_ranks_and_snapshots.csv", "#scatter2", "h1 Word Count");
    grouped_box_plot("js/all_queries_domains_with_ranks_and_snapshots_small.csv", "#groupedBox", "h1 Word Count");
    
</script>