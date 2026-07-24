# Blue Bayou Cabana Website

Static site hosted on GitHub Pages, served at [bluebayoucabana.com](https://bluebayoucabana.com).

## Structure

- `index.html` — main page
- `assets/css/style.css` — styles
- `assets/js/ordering.js` — time-gated online ordering widget
- `assets/img/` — images (placeholder logo included)
- `CNAME` — tells GitHub Pages to serve this repo at the custom domain

## Online ordering time gate

`assets/js/ordering.js` shows an "Order Online" button only between **11:00 AM
and 5:30 PM America/Chicago time** (handles CST/CDT automatically). Outside
that window it shows a disabled "Online Ordering Closed" state instead.

To change the hours, edit `ORDER_WINDOW` at the top of `assets/js/ordering.js`.

The button links to the RocketRez ordering page set via the `data-order-url`
attribute on `#order-widget` in `index.html`.

## DNS setup for bluebayoucabana.com

In your domain registrar's DNS settings, add:

**A records** (apex domain `bluebayoucabana.com`) pointing to GitHub Pages' IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME record** (if you also want `www.bluebayoucabana.com`):
```
www  ->  boywonder0806.github.io
```

Then in the repo's GitHub Settings → Pages, set the custom domain to
`bluebayoucabana.com` and enable "Enforce HTTPS" once DNS propagates.
