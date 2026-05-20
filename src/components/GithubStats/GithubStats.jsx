import styles from './GithubStats.module.css'

export default function GithubStats() {
  return (
    <section className={styles.stats}>
      <img
        src="https://github-readme-stats.vercel.app/api?username=command-bat&show_icons=true&theme=tokyonight"
        alt="GitHub Stats"
      />

      <img
        src="https://github-readme-stats.vercel.app/api/top-langs/?username=command-bat&layout=compact&theme=tokyonight"
        alt="Top Languages"
      />
    </section>
  )
}