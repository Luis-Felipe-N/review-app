import { Post } from '@/components/Post'

export default function Home() {
  return (
    <main className="flex container mx-auto min-h-screen flex-col items-center justify-between px-24 py-12">
      <section className="w-full">
        <ul className="flex gap-4">
          <li>
            <Post image="http://csspic.oss-cn-hangzhou.aliyuncs.com/o/3416793/RK-20-1689063021810.jpg?security-token=CAISlQJ1q6Ft5B2yfSjIr5bFLd%2FkiJgWx5qBZEnoqlUjfvtknKD8iDz2IHtOeHdqAesctf42mmpU7v8blrJaT55UWErjVvBM6Zda9yysZYfbstCy94YDjJD9wLxFxuOijqHoeOzcYI73WJXEMiLp9EJaxb%2F9ak%2FRPTiMOoGIjphKd8keWhLCAxNNGNZRIHkJyqZYTwyzU8ygKRn3mGHdIVN1sw5n8wNF5L%2B439eX52i17jS46JdM%2Bdipfcn1MJk9YMshC4vt5oEsKPqdihw3wgNR6aJ7gJZD%2FTr6pdyHCzFTmU7dabaKqIU0dlQjP%2FZgR%2FYd9eKPnPl5q%2FHVkJ%2Fs1xFOMOdaXiLSXom8x9HeH%2BekJia2%2FhpU2umnGoABH4fkh4%2FPsLP8NoILSlN5dEhf5Fe%2B%2BbbUzMtvdeHukZ3USvtwHmxbeT7oa4GNQsJZH6REuK31OJ0kDxYrorB%2FlaBNf%2BMKxOa98dGctWv6GNCJ4L7ARUoJE9MbEXLb01XFJzJstYaT%2FI5Z4mJkU9rJRY2JPvlJrfF2slUmrkcZgiU%3D&x-oss-process=image%2Fauto-orient%2C0%2Ct_100%2Fwatermark%2Ctext_Q1NTQnV5%2Cg_ne%2Cx_50%2Cy_50%2Csize_100%2Ccolor_FFFFFF%2Cshadow_50%2Ct_100%2Fwatermark%2Ctext_MjAyMy0wNy0xMSAxNjoxMDoyMg%2Cg_sw%2Cx_50%2Cy_50%2Csize_100%2Ctype_d3F5LXplbmhlaQ%2Ccolor_FFFFFF%2Cshadow_50%2Ct_100%2Fquality%2CQ_60%2Fwatermark%2Ctext_MjI0NS8xMTA1Zw%2Cg_north%2Cx_50%2Cy_50%2Csize_100%2Ctype_d3F5LXplbmhlaQ%2Ccolor_FFFFFF%2Cshadow_50%2Ct_100%2Fquality%2CQ_60&OSSAccessKeyId=STS.NUpfePeG7pXjfoYNUvrtHseWj&Expires=1689345574&Signature=9ZeDWAD0%2FkGx0EIMhlfmi8sNJYI%3D" />
          </li>
          <li>
            <Post image="https://i.imgur.com/pMLpL8G.jpeg" />
          </li>
          <li>
            <Post image="https://i.imgur.com/pMLpL8G.jpeg" />
          </li>
        </ul>
      </section>
    </main>
  )
}
