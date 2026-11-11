# GitHub build and download deployment

## 1. Put this project in its GitHub repository

Create or use the intended GitHub repository, add this project, and push it. These files deliberately do not assume an owner or repository name. The deployment workflow reads `${{ github.repository }}` and injects it into the built website. In this workspace, Git and a `.git` directory/remote were not available, so no repository URL could be resolved and no workflow run can be triggered from here.

## 2. Android APK workflow

Workflow: `.github/workflows/android.yml` (`Android APK`). It runs for `main` pushes, pull requests, `v*` tags, and manual dispatch from the Actions tab. The run's **SakhiSafe-Android-…** artifact contains `SakhiSafe.apk`. Actions permission `contents: read` is used for builds. The separate tag release job gets `contents: write` only to publish release assets.

The project has no committed npm lockfile. CI currently uses `npm install`; after a lockfile is created and committed, change this to `npm ci` and configure npm caching. The runner installs JDK 17, Android SDK 36, and Gradle 8.13. It generates a standard Gradle wrapper before compilation because the supplied source had no wrapper JAR. The local `gradlew` scripts bootstrap Gradle 8.13 when needed.

## 3. Optional signed release credentials

For a distributable signed APK, create a release keystore offline and add repository **Settings → Secrets and variables → Actions** secrets:

1. `ANDROID_SIGNING_KEY_BASE64`
2. `ANDROID_SIGNING_STORE_PASSWORD`
3. `ANDROID_SIGNING_KEY_ALIAS`
4. `ANDROID_SIGNING_KEY_PASSWORD`

Encode the keystore bytes as base64 before storing them. Do not commit the keystore/passwords. When all four secrets exist, a version-tag build creates a signed release APK. Without them, the workflow uses Android's debug signing key and creates a prerelease for development testing.

## 4. Publish a version

Update the app version/version code as appropriate in `android/app/build.gradle` and `package.json`, commit, and push. Create and push a version tag such as:

```sh
git tag v1.0.0
git push origin v1.0.0
```

Wait for the **Android APK** build and release jobs to succeed. The release includes `SakhiSafe.apk`, `SakhiSafe.apk.sha256`, and generated release notes. A failed build does not reach the release job. Signed releases are stable; unsigned development releases are prereleases and are excluded from GitHub's `/releases/latest/` URL.

## 5. Enable GitHub Pages

1. Open the repository on GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Confirm which branch is the repository's default branch.
5. Push a change under `website/` or manually run **Deploy download website** from the Actions tab on the default branch.
6. Wait until both the build and deployment jobs succeed.
7. Open the page URL shown by the `github-pages` environment and verify download/QR behavior.

The workflow `.github/workflows/deploy-pages.yml` only deploys from the repository's actual default branch. GitHub Pages is public; do not put personal data or credentials in the site. Its release metadata uses the unauthenticated public GitHub Releases API and handles unavailable API responses without breaking the stable download link.

The download site URL/QR is not considered live until the Pages deployment succeeds. The QR encodes `https://github.com/<owner>/<repository>/releases/latest/download/SakhiSafe.apk`, generated from the actual repository identity during the Pages workflow.
