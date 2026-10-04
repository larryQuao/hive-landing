import heroSectionUrl from '../assets/images/Hero-section.png'
import descriptionUrl from '../assets/images/description.png'

export function AppPreview() {
  return (
    <section className="px-4 pb-24">
      <div className="mx-auto flex max-w-7xl items-center justify-center rounded-[2.5rem] bg-black-5 py-24">
        <div data-reveal="scale" className="relative flex items-start justify-center">
          <img
            src={heroSectionUrl}
            alt="Hive home page with property search and featured listings"
            className="w-[17rem] rounded-2xl shadow-2xl shadow-black-90/20 sm:w-[24rem] lg:w-[30rem]"
          />
          <img
            src={descriptionUrl}
            alt="Choosing an account type on Hive — user, agent, or agency"
            className="-ml-12 mt-24 hidden w-[20rem] rounded-2xl shadow-2xl shadow-black-90/20 md:block lg:w-[26rem]"
          />
        </div>
      </div>
    </section>
  )
}
