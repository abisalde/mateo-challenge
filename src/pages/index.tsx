import * as React from 'react';

import { CustomEditor } from '@/components/editor';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <h1 className='text-5xl font-bold'>
              <span className='text-primary'>Next.js</span> +{' '}
              <span className='text-justify text-rose-900'>Draft.js</span>
              <span className='text-right text-gray-500'>Copy/Paste Image</span>
            </h1>

            <CustomEditor />
          </div>
        </section>
      </main>
    </Layout>
  );
}
