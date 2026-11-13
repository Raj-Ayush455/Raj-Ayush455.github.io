import { achievements } from '../data';
import { spotlightHandlers } from '../hooks';
import { Arrow } from './Icons';
import { Reveal, Section } from './ui';

export default function Achievements() {
  return (
    <Section id="achievements" index="05" kicker="achievements" title="Competitions & recognition">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => {
          const Card = a.link ? 'a' : 'div';
          return (
            <Reveal key={a.title} delay={(i % 3) * 70}>
              <Card
                {...(a.link ? { href: a.link, target: '_blank', rel: 'noreferrer' } : {})}
                {...spotlightHandlers()}
                className="spotlight group flex h-full flex-col justify-between rounded-xl border border-line bg-surface p-6 transition-colors"
              >
                <p className="font-serif text-5xl leading-none text-ink transition-colors group-hover:text-accent">{a.big}</p>
                <div className="mt-8">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
                    {a.title}
                    {a.link && <Arrow width={13} height={13} className="text-faint" />}
                  </p>
                  <p className="mt-1 text-sm text-muted">{a.detail}</p>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
