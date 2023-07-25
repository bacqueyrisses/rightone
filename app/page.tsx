import Image from "next/image";
import json from '@/json/words.json'
import {getStoredWord, setStoredWord} from "@/actions/actions";
import ClientSection from "@/components/clientSection";


export default async function Home() {

    const words = Object.entries(json)
    const wordsKeys = Object.keys(json)
    const index = Math.round(Math.random() * (words.length - 1));

    const setWord = async () => {
        let storedWord: string | null = ""
        let storedDescription: string = ""

        await getStoredWord().then(currentWord => {

            if (!currentWord) setStoredWord(words[index][0]).then(() => setWord())
            storedWord = currentWord
            const currentDescription = words.find(value => value[0] === currentWord)?.at(1)
            if (!currentDescription) return
            storedDescription = currentDescription
        })
        return {storedWord, storedDescription}
    }
    const {storedWord, storedDescription} = await setWord()

    return (
        <main className={"mb-5"}>
            <ClientSection storedWord={storedWord} storedDescription={storedDescription} wordsKeys={wordsKeys}
                           words={words}/>
            <section
                id="features"
                className="mx-auto flex w-5/6 flex-col items-center justify-evenly gap-4 bg-slate-50 py-8 md:container md:container dark:bg-transparent md:flex-row md:px-24 md:py-12 lg:w-9/12 lg:gap-10"
            >
                <div className={"flex flex-col items-center gap-2"}>
                    <Image
                        src={"/illustrations/discover.svg"}
                        alt={""}
                        width={200}
                        height={80}
                        className="rounded-md border bg-slate-100 transition-colors dark:bg-slate-500 sm:hidden"
                        priority={index <= 1}
                    />
                    <Image
                        src={"/illustrations/discover.svg"}
                        alt={""}
                        width={300}
                        height={100}
                        className="hidden rounded-md border bg-muted bg-slate-100 transition-colors dark:bg-slate-500 sm:inline-block"
                        priority={index <= 1}
                    />
                    <p className="text-center text-sm leading-normal sm:text-lg sm:leading-7">
                        Découvrez de nouveaux mots
                    </p>
                </div>
                <div className={"flex flex-col items-center gap-2"}>
                    <Image
                        src={"/illustrations/favorite.svg"}
                        alt={""}
                        width={200}
                        height={80}
                        className="rounded-md border bg-muted bg-slate-100 transition-colors dark:bg-slate-500 sm:hidden"
                        priority={index <= 1}
                    />
                    <Image
                        src={"/illustrations/favorite.svg"}
                        alt={""}
                        width={300}
                        height={100}
                        className="hidden rounded-md border bg-muted bg-slate-100 transition-colors dark:bg-slate-500 sm:inline-block"
                        priority={index <= 1}
                    />
                    <p className="text-center text-sm leading-normal sm:text-lg sm:leading-7">
                        Créez votre liste de jolis mots
                    </p>
                </div>
                <div className={"flex flex-col items-center gap-2"}>
                    <Image
                        src={"/illustrations/list.svg"}
                        alt={""}
                        width={200}
                        height={80}
                        className="rounded-md border bg-muted bg-slate-100 transition-colors dark:bg-slate-500 sm:hidden"
                        priority={index <= 1}
                    />
                    <Image
                        src={"/illustrations/list.svg"}
                        alt={""}
                        width={300}
                        height={100}
                        className="hidden rounded-md border bg-muted bg-slate-100 transition-colors dark:bg-slate-500 sm:inline-block"
                        priority={index <= 1}
                    />
                    <p className="text-center text-sm leading-normal sm:text-lg sm:leading-7">
                        Au choix : Votre liste ou la nôtre
                    </p>
                </div>
            </section>
        </main>
    );
}
