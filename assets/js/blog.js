// Blog functionality

// Filter posts by category
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter posts
            blogPosts.forEach(post => {
                const category = post.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    post.classList.remove('hidden');
                } else {
                    post.classList.add('hidden');
                }
            });
        });
    });
});

// Toggle post expand/collapse
function togglePost(button) {
    const post = button.closest('.blog-post');
    const isCollapsed = post.classList.contains('collapsed');

    if (isCollapsed) {
        post.classList.remove('collapsed');
        button.textContent = 'Read Less →';
    } else {
        post.classList.add('collapsed');
        button.textContent = 'Read More →';

        // Scroll to post top when collapsing
        post.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
