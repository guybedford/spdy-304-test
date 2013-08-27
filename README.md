Consideration is how to cache 304 responses for push streams.

Use case is a CSS file shared between two pages. It is sent by a SPDY push stream for both pages, with a max age and etag with the CSS push.

The idea is that if the first page has already sent the CSS file, the second page should be able to see the etag sent in the push stream
header for the second page, and if it matches it doesn't need to accept the new push stream.

We test this by having two pages with the same etag, but different CSS content.

When setup, this test server has two urls:

/page1
/page2

The maxAge is 10 seconds, after this, the colour of the heading changes because instead of checking the etag,
the push stream is accepted causing a CSS change.

Hopefully future browser implementations can take this etag check into account.



